
// este script debería de ejecutarce al iniciar cada página
// para definir estos eventos customizados

export const set_trigger_para_modificacion_localstorage = () => {
    // crear un evento customizado 
    function triggerStorageEvent(key, value) {
        const event = new CustomEvent('storageChange', {
            detail: {
                key: key,
                value: value
            }
        });
        window.dispatchEvent(event);
    }

    // referenciar los métodos originales a sobreescribir
    const originalSetItemLocalStorage = localStorage.setItem;
    const originalRemoveItemLocalStorage = localStorage.removeItem;

    // sobreescribir metodos para que además lanzen un evento
    localStorage.setItem = function (key, value) {
        originalSetItemLocalStorage.apply(this, arguments);
        triggerStorageEvent(key, value);
    }

    localStorage.removeItem  = function (key) {
        originalRemoveItemLocalStorage.apply(this, arguments);
        triggerStorageEvent(key, null);
    }
}