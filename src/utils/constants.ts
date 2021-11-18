import { shuffle } from 'lodash';

export const jwtConstants = {
    secret: 'secretKey',
  };
  
  export const RoleTypes = {
    Administrator: "Administrator",
    Member: "Member"
}

export function generateRandomPassword() {
  const rand = ['1234567890', 'QWERTYUIOPASDFGHJKLZXCVBNM'];
  let password = '';
  for (const r of rand) {
    for (let i = 0; i < 4; i++) {
      password += r[Math.floor(Math.random() * r.length)];
    }
  }
  return shuffle(password).join('');
}

// RonakKhunt
// pdIW9xpmWKscKseM