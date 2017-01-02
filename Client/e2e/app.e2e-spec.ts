import { TteamsPage } from './app.po';

describe('tteams App', function() {
  let page: TteamsPage;

  beforeEach(() => {
    page = new TteamsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
