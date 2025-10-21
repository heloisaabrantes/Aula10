const productImages = {
    bordo: {
        front: 'img/bordofrente.webp',
        back: 'img/bordocostas.webp',
        angle1: 'img/bordolateral.webp',
    },
    preto: {
        front: 'img/pretofrente.webp',
        back: 'img/pretocostas.webp',
        angle1: 'img/pretolateral.webp',
    },
    cinza: {
        front: 'img/cinzafrente.webp',
        back: 'img/cinzacostas.webp',
        angle1: 'img/cinzalateral.webp',
    }
};

// Mapeamento de cor para código HEX para as amostras visuais
const colorMap = {
    bordo: '#800020',
    preto: '#000000',
    cinza: '#A9A9A9'
};

let currentColor = 'bordo';

// Elementos do DOM
const featuredImage = document.getElementById('featured-image');
const hoverImage = document.getElementById('hover-image');
const thumbnailContainer = document.getElementById('thumbnail-container');
const colorSelector = document.getElementById('color-selector');
const sizeButtons = document.querySelectorAll('.size-button');

function selectColor(color) {
    if (currentColor === color) return;
    currentColor = color;

    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.remove('active');
        if (swatch.dataset.color === color) {
            swatch.classList.add('active');
        }
    });

    // Atualiza a Imagem Principal e a de Hover
    featuredImage.src = productImages[color].front;
    hoverImage.src = productImages[color].back;

    // Reconstroi as Miniaturas
    const urls = Object.values(productImages[color]);
    thumbnailContainer.innerHTML = '';

    urls.forEach((url, index) => {
        const img = document.createElement('img');
        img.className = 'thumbnail';
        img.src = url;
        img.alt = `Moletom ${color} - Ângulo ${index + 1}`;
        
        if (url === productImages[color].front) {
            img.classList.add('active');
        }
        
        img.onclick = () => selectThumbnail(url, img);

        thumbnailContainer.appendChild(img);
    });
}

function selectThumbnail(url, thumbnailElement) {
    if (url === productImages[currentColor].front) {
        featuredImage.src = url;
        hoverImage.src = productImages[currentColor].back;
        featuredImage.parentElement.classList.remove('no-hover-effect');
    } else {
        featuredImage.src = url;
        hoverImage.src = url;
        featuredImage.parentElement.classList.add('no-hover-effect');
    }

    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnailElement.classList.add('active');
}

function handleSizeSelection(button) {
    sizeButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// INICIALIZAÇÃO DA PÁGINA
document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializa as bolinhas de cor
    for (const colorName in productImages) {
        const swatch = document.createElement('button');
        swatch.className = 'color-swatch';
        swatch.style.backgroundColor = colorMap[colorName];
        swatch.dataset.color = colorName;
        swatch.onclick = () => selectColor(colorName);
        
        colorSelector.appendChild(swatch);
    }
    
    // 2. Seleciona a cor inicial e popula miniaturas
    selectColor(currentColor);

    // 3. Adiciona funcionalidade aos botões de tamanho
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => handleSizeSelection(button));
    });

    // 4. Funcionalidade de Quantidade
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('qty-input');

    qtyMinus.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        if (currentQty > 1) {
            qtyInput.value = currentQty - 1;
        }
    });

    qtyPlus.addEventListener('click', () => {
        let currentQty = parseInt(qtyInput.value);
        qtyInput.value = currentQty + 1;
    });
});