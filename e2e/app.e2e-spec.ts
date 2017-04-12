import { AbcRrhhPage } from './app.po';

describe('abc-rrhh App', () => {
  let page: AbcRrhhPage;

  beforeEach(() => {
    page = new AbcRrhhPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
