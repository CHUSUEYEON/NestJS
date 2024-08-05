export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus; //status : 이 게시물이 공개 게시물인지, 비밀인지 나눠주는 것(공개/비공개 이 두 가지 외에는 나오면 안됨.) => enum 사용
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
