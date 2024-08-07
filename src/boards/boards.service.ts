// Service는 게시물에 관한 로직 처리하는 곳

import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}
  // private boards: Board[] = []; // 다른 컴포넌트에서 배열값을 수정되지 않게 하기 위해 private 사용
  // getAllBoards(): Board[] {
  //   // return 값이 어떤 타입이 되는지 작성.
  //   return this.boards;
  // }
  // //   createBoard(title: string, description: string) {
  // createBoard(createBoardDto: createBoardDto) {
  //   // const title = createBoardDto.title;
  //   const { title, description } = createBoardDto;
  //   const board: Board = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  createBoard(createBoardDto: createBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id: id });

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Can't find Board with id ${id}`);
  //   }
  //   return found;
  // }

  //remove() vs. delete()
  //remove : 무조건 존재하는 아이템을 remove메소드를 이용해서 지워야 한다. 그렇지 않으면 404에러
  //delete : 만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.
  // -> remove를 이용하면 하나의 아이템을 지울 때 두 번 데이터베이스를 이용해야하기 때문에
  // (아이템 유무 + 지우기) 데이터베이스에 한번만 접근해도 되는 delete를 사용한다.

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    console.log('result::', result);
  }

  // deleteBoard(id: string): void {
  //   const found = this.getBoardById(id); // 없는 게시물을 지우려 할 때 결과값 처리
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  //   // id가 다른 board만 남겨짐.
  // }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);

    return board;
  }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
}
