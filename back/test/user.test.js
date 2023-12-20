import { createUserDto } from "../src/db/DTO/createUserDto";
import { User } from "../src/db/DAO/User";

test("유저 생성 테스트", async () => {
  const newUser = new createUserDto(
    {
      email: "examemail12@test.com",
      password: "testPassword!",
      username: "테스트계정",
      address: "경기도 수원시 12로",
      phone_number: "010-1234-5678",
    },
    new Date()
  );
  await newUser.passwordEncrypt();
  const result = await User.createUser({ newUser });
  console.log("데이터베이스 호출 결과: ", result);
});
