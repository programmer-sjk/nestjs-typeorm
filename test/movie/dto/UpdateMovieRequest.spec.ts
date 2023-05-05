import { validate } from 'class-validator';
import { MovieTestFactory } from '../../fixture/MovieTestFactory';
import { UpdateMovieRequest } from '../../../src/movie/dto/UpdateMovieRequest';

describe('UpdateMovieRequest', () => {
  it('정상적으로 dto를 생성할 수 있다.', async () => {
    // given
    const dto = MovieTestFactory.createUpdateMovieRequest('먼 훗날 우리');

    // when
    const errors = await validate(dto);

    // then
    expect(errors.length).toBe(0);
  });

  it('영화 제목, 자막, 국가, 제작사는 공백일 수 없다.', async () => {
    // given
    const dto = new UpdateMovieRequest(null, null, null, null, null);

    // when
    const errors = await validate(dto);

    // then
    const errorProperties = errors.map((err) => err.property);
    expect(errorProperties).toContain('title');
    expect(errorProperties).toContain('subTitleLanguage');
    expect(errorProperties).toContain('madeBy');
    expect(errorProperties).toContain('filmCompany');
  });

  it('영화설명은 공백일 수 있다.', async () => {
    // given
    const dto = new UpdateMovieRequest('title', 'EN', 'KOREA', 'company', null);

    // when
    const errors = await validate(dto);

    // then
    expect(errors.length).toBe(0);
  });
})
