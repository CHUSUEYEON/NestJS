// Service는 게시물에 관한 로직 처리하는 곳

import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = []; // 다른 컴포넌트에서 배열값을 수정되지 않게 하기 위해 private 사용

  getAllBoards(): Board[] {
    // return 값이 어떤 타입이 되는지 작성.
    return this.boards;
  }

  //   createBoard(title: string, description: string) {
  createBoard(createBoardDto: createBoardDto) {
    // const title = createBoardDto.title;
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
    // id가 다른 board만 남겨짐.
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
