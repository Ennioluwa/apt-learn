import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err: any, salt: string) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err: any, hash: string) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

export const comparePassword = (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed); // boolean
};
