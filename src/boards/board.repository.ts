import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';

// 이 레파지토리를 다른데서도 사용할 수 하기 위해서 module에서 TypeOrm을 import 해준다.
@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {}
