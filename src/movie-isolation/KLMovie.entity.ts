import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LengthType, MediaType, RatingType } from './isolation.enum';

@Entity('KLMovie')
export class KLMovie {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Idx', unsigned: true })
  id: number;

  @Column('varchar', { name: 'KOBIS_MovieCd', nullable: true, length: 10 })
  kobisMovieCd?: string;

  @Column('bigint', { name: 'TMDB_ID', nullable: true })
  tmdbId?: number;

  @Column('varchar', { name: 'IMDB_ID', nullable: true, length: 50 })
  imdbId?: string;

  @Column('bigint', { name: 'Rotten_Idx', nullable: true })
  rottenId?: number;

  @Column('varchar', { name: 'PosterImagePath', nullable: true, length: 255 })
  posterImagePath?: string;

  @Column('varchar', { name: 'TitleKr', length: 255 })
  titleKr: string;

  @Column('varchar', { name: 'TitleEn', nullable: true, length: 255 })
  titleEn?: string;

  @Column('varchar', {
    name: 'TitleOri',
    nullable: true,
    comment: '영화 원제목 (영어권 이외의 영화)',
    length: 255,
  })
  titleOri?: string;

  @Column('varchar', {
    name: 'ProductionYear',
    nullable: true,
    comment: '제작년도',
    length: 5,
  })
  productionYear?: string;

  @Column('enum', {
    name: 'Rating',
    comment:
      '상영 등급 (전체관람가, 12세이상관람가, 15세이상관람가, 청소년관람불가, 제한상영가, 미정, 기타)',
    enum: RatingType,
    default: RatingType.ETC,
  })
  rating: RatingType;

  @Column('int', {
    name: 'ShowTime',
    comment: '상영시간(분)',
    unsigned: true,
    default: 0,
  })
  showTime: number;

  @Column('text', { name: 'Synopsis', comment: '줄거리' })
  synopsis: string;

  @Column('int', {
    name: 'AudienceCount',
    comment: '관객 수',
    unsigned: true,
    default: 0,
  })
  audienceCount: number;

  @Column('date', { name: 'ReleasedAt', nullable: true, comment: '개봉일' })
  releasedAt?: string;

  @Column('enum', {
    name: 'LengthType',
    comment: '영화 유형 (장편, 단편, 기타)',
    enum: LengthType,
    default: LengthType.ETC,
  })
  lengthType: LengthType;

  @Column('varchar', { name: 'MovieClip', nullable: true, length: 255 })
  movieClip?: string;

  @Column('enum', {
    name: 'MediaType',
    enum: MediaType,
    default: MediaType.MOVIE,
  })
  mediaType: MediaType;

  @Column('boolean', {
    name: 'IsPublic',
    comment: '키노라이츠 웹사이트 공개 여부',
    default: false,
  })
  isPublic: boolean;

  @Column('boolean', { name: 'IsPerfect', default: false })
  isPerfect: boolean;

  @Column('int', { name: 'checkCount', default: 0, comment: '어드민에서 해당 작품 검수 횟수' })
  checkCount: number;

  @Column('int', { name: 'PastViews', unsigned: true, default: 0 })
  pastViews: number;

  @Column('double', {
    name: 'ImdbScore',
    nullable: true,
    unsigned: true,
    precision: 22,
  })
  imdbScore?: number;

  @Column('int', {
    name: 'RottenTomatoesScore',
    nullable: true,
    unsigned: true,
  })
  rottenTomatoesScore?: number;

  @Column('int', { name: 'WatchedCount', unsigned: true, default: 0 })
  watchedCount: number;

  @Column('int', {
    name: 'WatchListCount',
    unsigned: true,
    default: 0,
  })
  watchListCount: number;

  @Column('int', {
    name: 'IndexRatingCount',
    unsigned: true,
    default: 0,
  })
  indexRatingCount: number;

  @Column('int', {
    name: 'StarRatingCount',
    unsigned: true,
    default: 0,
  })
  starRatingCount: number;

  @Column('int', { name: 'ReviewCount', unsigned: true, default: 0 })
  reviewCount: number;

  @CreateDateColumn({ name: 'CreatedAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt', type: 'datetime' })
  updatedAt: Date;

  @Column('datetime', { name: 'CertifiedAt', nullable: true })
  certifiedAt?: Date;
}
