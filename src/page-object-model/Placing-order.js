import { userData } from "../utils/userCredentials";

export default class PlacingOrder {
    get checkoutButton() { return $('div.cart-content-wrapper.scrolling > div > div > div > div.button'); }
    get firstName() { return $('input[name="fields[first_name]"]'); }
    get lastName() { return $('input[name="fields[last_name]"]'); }
    get phoneNumber() { return $('input[name="fields[additional_field_1]"]'); }
    get emailAdress() { return $('input[name="fields[email]"]'); }
    get nextButton() { return $('label.button'); }
    get cityOption() { return $('//*[text()="Київ"]'); }
    get submitButton() { return $('.button.disabled'); }

    async fillField(firstname, lastname, phone, email) {
        await this.checkoutButton.click();
        await this.firstName.click();
        await this.firstName.setValue(firstname);
        await this.lastName.click();
        await this.lastName.setValue(lastname);
        await this.phoneNumber.click();
        await this.phoneNumber.setValue(phone);
        await this.emailAdress.setValue(email);

        const cityInput = await $('#select-city');
        await this.nextButton.click();
        await cityInput.setValue(userData.city);
        await this.cityOption.waitForDisplayed({ timeout: 5000 });
        await this.cityOption.click();
    };
};

