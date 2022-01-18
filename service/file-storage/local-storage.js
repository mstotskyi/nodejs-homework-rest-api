import path from 'path';
import fs from 'fs/promises';
import Users from '../../repository/users';

class LocalStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.fileName = file.filename;
    this.filePath = file.path;
    this.folderAvatars = process.env.AVATARS_FOLDER;
  }

  async save() {
    const dest = path.join(this.folderAvatars, this.userId);
    await fs.mkdir(dest, { recursive: true });
    await fs.rename(this.filePath, path.join(dest, this.fileName));
    const avatarUrl = path.normalize(path.join(this.userId, this.fileName));
    await Users.updateAvatar(this.userId, avatarUrl);
    return avatarUrl;
  }
}

export default LocalStorage;
