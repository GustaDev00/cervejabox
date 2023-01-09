declare global {
    interface Window {
        vtexjs: {
            checkout: {
                getOrderForm: Function;
            };
        };
    }
}

export const InitializeEvents = () => {
    try {
        orderForm();
    } catch (e) {
        console.error(`[InitializeEvents]`, e);
    }
};

const orderForm = () => {
    window.vtexjs.checkout.getOrderForm().then((orderForm: any) => {
        const event = new CustomEvent("orderForm", { detail: orderForm });
        document.dispatchEvent(event);
    });
};
