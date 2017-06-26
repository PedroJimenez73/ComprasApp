import { AppComprasPage } from './app.po';

describe('app-compras App', () => {
  let page: AppComprasPage;

  beforeEach(() => {
    page = new AppComprasPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
