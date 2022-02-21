/**
 * Setup script after page is loaded
 */
window.addEventListener('load', (event) => {
    // Append date if Ad page is opened directly
    appendCreationDateElement();

    // Append date when URL is changed
    const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
                appendCreationDateElement();
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(getMetaOgImageEl(), { attributes: true, childList: false, subtree: false });
});

/**
 * Get creation date of Ad from image and display it
 */
function appendCreationDateElement()
{
    const dateInfoId = 'ad-date-info'
    if (document.getElementById(dateInfoId)) return;

    let wrapperEl = this.getElementByClassName('propId');

    if (wrapperEl) {
        let separatorEl = this.getElementByClassName('heading-info-dot');
        let metaImage = getMetaOgImageEl().content;
        let date = metaImage.split('-_').pop().split('.')[0].replace('_0', '');

        let dateElement = document.createElement('span');
        dateElement.id = dateInfoId;
        dateElement.textContent = ' Objavljen: ' + `${date.substring(6, 8)}.${date.substring(4, 6)}.${date.substring(0, 4)}`;

        wrapperEl.appendChild(separatorEl.cloneNode(true));
        wrapperEl.appendChild(dateElement);
    }
}

/**
 * @param className
 * @returns {Element|null}
 */
function getElementByClassName(className) {
    let propIds = document.getElementsByClassName(className);

    return (propIds[0] ?? null);
}

/**
 * @returns {Element}
 */
function getMetaOgImageEl() {
    return document.head.querySelector("[property~='og:image'][content]")
}
