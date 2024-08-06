import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};

// 엔티티 : 엔티티를 이용해서 데이터베이스 테이블 생성 => 엔티티 파일이 어디에 있는지 설정
// synchronize : true 값을 주면 애플리케이션을 다시 실행할 때 엔티티안에서 수정된 컬럼의 타입 변경값 등 해당 테이블을 Drop한 후 다시 새성
