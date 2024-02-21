import * as qiniu from 'qiniu';
import * as process from 'process';

interface QiniuServiceConfig {
  accessKey: string;
  secretKey: string;
  bucket: string;
  domain: string;
}

export class QiniuService {
  /**
   * 七牛云accessKey
   */
  public accessKey: string = process.env.QINIU_AK;

  /**
   * 七牛云secretKey
   */
  public secretKey: string = process.env.QINIU_SK;

  /**
   * 七牛云存储空间名
   */
  public bucket: string = process.env.QINIU_BUCKET;

  /**
   * 七牛云存储空间域名
   */
  public domain: string = process.env.QINIU_DOMAIN;

  constructor(opts: Partial<QiniuServiceConfig> = {}) {
    this.accessKey = opts.accessKey ? opts.accessKey : this.accessKey;
    this.secretKey = opts.secretKey ? opts.secretKey : this.secretKey;
    this.bucket = opts.bucket ? opts.bucket : this.bucket;
    this.domain = opts.domain ? opts.domain : this.domain;
  }

  /**
   * 获取上传对象
   */
  private getUploader() {
    return new qiniu.form_up.FormUploader(new qiniu.conf.Config());
  }

  /**
   * 获取上传凭证
   */
  private getMac() {
    return new qiniu.auth.digest.Mac(this.accessKey, this.secretKey);
  }

  /**
   * 获取上传凭证
   */
  private getPutPolicy() {
    return new qiniu.rs.PutPolicy({
      scope: this.bucket
    });
  }

  /**
   * 获取上传token
   */
  private getUploadToken() {
    return this.getPutPolicy().uploadToken(this.getMac());
  }

  /**
   * 上传文件
   */
  async put(
    key: string,
    fileBuffer: any
  ): Promise<{
    url: string;
    hash: string;
    status: number;
    raw: qiniu.form_up.UploadResult;
  }> {
    return new Promise((resolve, reject) => {
      const putExtra = new qiniu.form_up.PutExtra();
      this.getUploader().put(this.getUploadToken(), key, fileBuffer, putExtra, (err, body, info) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            url: `${this.domain}/${key}`,
            hash: body.hash,
            status: info.statusCode,
            raw: {
              data: body,
              resp: info
            }
          });
        }
      });
    });
  }

  /**
   * 删除文件
   */
  remove(key: string): Promise<any> {
    const config = new qiniu.conf.Config();
    const rs = new qiniu.rs.BucketManager(this.getMac(), config);
    return new Promise((resolve, reject) => {
      rs.delete(this.bucket, key, (err, respBody, respInfo) => {
        if (err) {
          reject(err);
        } else {
          resolve(respBody);
        }
      });
    });
  }
}
