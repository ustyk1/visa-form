const $ = selector => document.querySelector(selector);

const $passportFieldWrapper = $('.passport');
const $scannedCopyFieldWrapper = $('.scanned-copy');
const $ukrainianPassportFieldWrapper = $('.ukrainian-passport');
const $marriageOrDivorceCertificateFieldWrapper = $('.marriage-or-divorce-certificate');
const $childrensBirthCertificatesFieldWrapper = $('.childrens-birth-certificates');
const $bankAccountStatementFieldWrapper = $('.bank-account-statement');
const $applyBtn = $('.apply');

const blurBlockForActivate = {
  'passport': $('.scanned-copy + .blur'),
  'scanned-copy':  $('.ukrainian-passport + .blur'),
  'ua-passport': $('.marriage-or-divorce-certificate + .blur'),
  'marriage-certificate': $('.childrens-birth-certificates + .blur'),
  'birth-certificate': $('.bank-account-statement + .blur'),
  'bank-statement': $('.bank-account-statement + .blur'),
}

const inputsForDisabling = {
  'inp-passport-available': $('#inp-passport-unavailable'),
  'inp-passport-unavailable': $('#inp-passport-available'),
  'inp-scanned-copy-available': $('#inp-scanned-copy-unavailable'),
  'inp-scanned-copy-unavailable': $('#inp-scanned-copy-available'),
  'inp-ua-passport-available': $('#inp-ua-passport-unavailable'),
  'inp-ua-passport-unavailable': $('#inp-ua-passport-available'),
  'inp-marriage-certificate-available': $('#inp-marriage-certificate-unavailable'),
  'inp-marriage-certificate-unavailable': $('#inp-marriage-certificate-available'),
  'inp-birth-certificate-avaiable': $('#inp-birth-certificate-unavaiable'),
  'inp-birth-certificate-unavaiable': $('#inp-birth-certificate-avaiable'),
  'inp-bank-statement-available': $('#inp-bank-statement-unavailable'),
  'inp-bank-statement-unavailable': $('#inp-bank-statement-available'),
}
const errorMessages = {
  'passport': 'Закордонний паспорт відсутній!',
  'scanned-copy': 'Cкан-копії всіх сторінок закордонного паспорта відсутні!',
  'ua-passport': 'Свідоцтво про шлюб чи розлучення відсутнє!',
  'marriage-certificate': 'Свідоцтво про шлюб чи розлучення відсутнє!',
  'birth-certificate': 'Свідоцтво про народження дітей відсутнє!',
  'bank-statement': 'Виписка з банківського рахунку за останні пів року відсутня!',
}

$applyBtn.addEventListener('click', () => $('.successful-msg-box').style.display = 'block');

function newPromise(wrapper, inputSelector) {
  return new Promise((resolve, reject) => {
    wrapper.querySelectorAll(inputSelector).forEach(input => {
      input.addEventListener('change', event => {
        const input = event.target;

        switch (input.value) {
          case 'available':
            blurBlockForActivate[input.name].style.height = 0;
            inputsForDisabling[input.id].disabled = true;
            resolve(true);
            break;
        
          case 'unavailable':
            inputsForDisabling[input.id].disabled = true;
            reject(errorMessages[input.name]);
            break;
        }
      })
    })
  })
}

const promises = Promise.all([
  newPromise($passportFieldWrapper, 'input[name="passport"]'),
  newPromise($scannedCopyFieldWrapper, 'input[name="scanned-copy"]'),
  newPromise($ukrainianPassportFieldWrapper, 'input[name="ua-passport"]'),
  newPromise($marriageOrDivorceCertificateFieldWrapper, 'input[name="marriage-certificate"]'),
  newPromise($childrensBirthCertificatesFieldWrapper, 'input[name="birth-certificate"]'),
  newPromise($bankAccountStatementFieldWrapper, 'input[name="bank-statement"]'),
]);

promises
.then(value => {
  $applyBtn.disabled = false;
})
.catch(error => {
  $('.error-msg-box').style.display = 'block';
  $('.error-msg-box > p').textContent = `${error}`;
});