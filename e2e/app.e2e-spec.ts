import { CubeCliPage } from './app.po';

describe('cube-cli App', function() {
  let page: CubeCliPage;

  beforeEach(() => {
    page = new CubeCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
