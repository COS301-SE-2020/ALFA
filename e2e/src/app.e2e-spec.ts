import { AppPage } from './app.po';
import { browser, logging, by, element } from 'protractor';
import { protractor } from 'protractor/built/ptor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('ALFA: Automated Log File Analyzer');
  });
  it('should initially have solve error button disabled', () => {
    const button = element(by.buttonText('Solve error'));
    expect(button.isEnabled()).toEqual(false);
  });
  it('should have errors input field', () => {
    const field = element(by.id('error-inp'));
    expect(field.isDisplayed()).toEqual(true);
  });
  it('should take errors as input on textarea', () => {
    const field = element(by.id('error-inp'));
    field.click();
    field.clear();
    field.sendKeys('[Mon Feb 12 13:35:40.960021 2018] [autoindex:error] [pid 25057] [client 127.0.0.1:57668] AH01276: Cannot serve directory /home/cs/students/u16220073/: No matching DirectoryIndex (index.html,index.html.var,index.php,index.phtml) found, and server-generated directory index forbidden by Options directive    ');
    expect(field.getAttribute('value')).toEqual('[Mon Feb 12 13:35:40.960021 2018] [autoindex:error] [pid 25057] [client 127.0.0.1:57668] AH01276: Cannot serve directory /home/cs/students/u16220073/: No matching DirectoryIndex (index.html,index.html.var,index.php,index.phtml) found, and server-generated directory index forbidden by Options directive    ');
  });
  it('Solve errors should be clickable after adding input to field', () => {
    const field = element(by.id('error-inp'));
    field.click();
    field.clear();
    field.sendKeys('[Mon Feb 12 13:35:40.960021 2018] [autoindex:error] [pid 25057] [client 127.0.0.1:57668] AH01276: Cannot serve directory /home/cs/students/u16220073/: No matching DirectoryIndex (index.html,index.html.var,index.php,index.phtml) found, and server-generated directory index forbidden by Options directive    ');
    const button = element(by.buttonText('Solve error'));
    expect(button.isEnabled()).toEqual(true);
  });
  it('should click button to send logfile', () => {
    const field = element(by.id('error-inp'));
    field.click();
    field.clear();
    field.sendKeys('[Mon Feb 12 13:35:40.960021 2018] [autoindex:error] [pid 25057] [client 127.0.0.1:57668] AH01276: Cannot serve directory /home/cs/students/u16220073/: No matching DirectoryIndex (index.html,index.html.var,index.php,index.phtml) found, and server-generated directory index forbidden by Options directive    ');
    const button = element(by.buttonText('Solve error'));
    button.click();
    const elem = element(by.id('analysis-result'));
    expect(browser.wait(protractor.ExpectedConditions.presenceOf(elem)));

  });
  it('should redirect user to redirect', () => {
    const elem = element(by.buttonText('View solution'));
    expect(browser.wait(protractor.ExpectedConditions.presenceOf(elem)));
  })
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
