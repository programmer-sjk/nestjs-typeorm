import { validate } from 'class-validator';
import { CreateUserRequest } from '../../../src/user/dto/CreateUserRequest'

describe('CreateUserRequest', () => {
  it('정상적으로 dto를 생성 할 수 있다.', async () => {
    // given
    const dto = new CreateUserRequest('email@email.com', 'password', 'name');

    // when
    const errors = await validate(dto);

    // then
    expect(errors.length).toBe(0);
  });

  it('이름이 10글자를 초과하면 예외가 발생한다.', async () => {
    // given
    const dto = new CreateUserRequest(
      'email@email.com',
      'password',
      '0123456789!',
    );

    // when
    const errors = await validate(dto);

    // then
    const nameError = errors.filter((err) => err.property === 'name')[0];
    expect(nameError.constraints.maxLength).toBe(
      'name must be shorter than or equal to 10 characters',
    );
  });

  test.each([null, '', undefined])(
    'email은 공백일 수 없다, input=%s',
    async (input) => {
      // given
      const dto = new CreateUserRequest(input, 'password', 'name');

      // when
      const errors = await validate(dto);

      // then
      const emailError = errors.filter((err) => err.property === 'email')[0];
      expect(emailError.constraints.isNotEmpty).toBe(
        'email should not be empty',
      );
    })
})
