import Jimp from 'jimp';

class FileStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
    console.log(file.path);
  }

  async updateAvatar() {
    await this.prepareAvatar(this.pathFile);
    const userAvatarUrl = await this.storage.save();
    return userAvatarUrl;
  }

  async prepareAvatar(pathFile) {
    const picture = await Jimp.read(pathFile);
    await picture
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE,
      )
      .writeAsync(pathFile);
  }
}

export default FileStorage;
