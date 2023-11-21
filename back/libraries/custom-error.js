// 400: 클라이언트 측의 오류로 응답 반환 불가
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 400: 존재하지 않는 아이디, 이메일
class INVALID_USER_Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

// 401: 인증되지 않은 상태에서 인증이 필요한 리소스에 접근
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

// 404: 찾고자 하는 Route가 존재하지 않음
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

// 403: 인증된 상태에서 권한이 없는 리소스에 접근
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

// 409 중복된 요청 (예시. 중복 회원가입)
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
export {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  ConflictError,
  INVALID_USER_Error,
};
