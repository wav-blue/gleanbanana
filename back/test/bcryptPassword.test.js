import { bcryptPassword } from "../src/utils/bcryptPassword";

test("비밀번호 변환 확인 테스트", async () => {
  const exam_password = [
    "Abcd1234!",
    "Abcd1234!Abcd1234!",
    "CBCABCaadla!!!jdljs!",
    "CBCABCaadla!!!jdljs!Abcd1234!",
  ];
  const encrypt_password = [];
  for (let i = 0; i < exam_password.length; i++) {
    encrypt_password.push(await bcryptPassword(exam_password[i]));
  }
  for (let i = 0; i < encrypt_password.length; i++) {
    console.log("변환된 길이 >> ", encrypt_password[i].length);
  }
});
