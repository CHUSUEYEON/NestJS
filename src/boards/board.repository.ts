import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { Injectable } from '@nestjs/common';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';

// 이 레파지토리를 다른데서도 사용할 수 하기 위해서 module에서 TypeOrm을 import 해준다.

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: createBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
