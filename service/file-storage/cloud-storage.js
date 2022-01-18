import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'fs/promises';
import { promisify } from 'util';
import { CLOUD_AVATARS_FOLDER } from '../../libs/constants';
import Users from '../../repository/users';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class CloudStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filePath = file.path;
    this.cloudAvatarId = user.cloudAvatarId;
    this.folderAvatars = CLOUD_AVATARS_FOLDER;
    this.uploadCloud = promisify(cloudinary.uploader.upload);
  }

  async save() {
    const { public_id: returnedCloudAvatarId, secure_url: avatarUrl } =
      await this.uploadCloud(this.filePath, {
        public_id: this.cloudAvatarId,
        folder: this.folderAvatars,
      });

    const newCloudAvatarId = returnedCloudAvatarId.replace(
      `${this.folderAvatars}/`,
      '',
    );

    await Users.updateAvatar(this.userId, avatarUrl, newCloudAvatarId);
    await this.removeTmpFile(this.filePath);
    return avatarUrl;
  }

  async removeTmpFile(filePath) {
    try {
      await unlink(filePath);
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default CloudStorage;
