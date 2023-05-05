import { validate } from 'class-validator';
import { MovieTestFactory } from '../../fixture/MovieTestFactory';
import { UpdateMovieScoreRequest } from '../../../src/movie/dto/UpdateMovieScoreRequest';

describe('UpdateMovieScoreRequest', () => {
  it('정상적으로 dto를 생성할 수 있다.', async () => {
    // given
    const dto = MovieTestFactory.createUpdateMovieScoreRequest(3, 3, 3);

    // when
    const errors = await validate(dto);

    // then
    expect(errors.length).toBe(0);
  });

  it('영화 로튼, IMDB, 개인 별점은 공백일 수 없다.', async () => {
    // given
    const dto = new UpdateMovieScoreRequest(null, null, null);

    // when
    const errors = await validate(dto);

    // then
    const errorProperties = errors.map((err) => err.property);
    expect(errorProperties).toContain('rottenScore');
    expect(errorProperties).toContain('imDbScore');
    expect(errorProperties).toContain('score');
  });
});
