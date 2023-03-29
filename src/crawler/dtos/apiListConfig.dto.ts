//* TODO: 제대로 만들어서 사용할 수 있게 설정 필요
export class ApiListConfigDto {
  securityNews: {
    main: {
      security: string;
      it: string;
      safety: string;
      securityWorld: string;
    };
    news: {
      total: string;
    };
  };
}
