<script setup>
import PDFDocument from './components/PDFDocument.vue';
</script>

<script>
export default {
    data() {
        return {
            url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS',
            scale: 1,
            page: undefined,
            numPages: 1,
        };
    },

    computed: {
        theScale() {
            return +this.scale.toFixed(2);
        },
    },

    methods: {
        checkPage() {
            if (this.page !== undefined) {
                if (this.page <= 1) {
                    this.page = 1;
                } else if (this.page >= this.numPages) {
                    this.page = this.numPages;
                }
            } else {
                this.page = 'all';
            }
        },

        previousPage() {
            console.log('[APP] [previousPage()]');
            if (this.page === undefined || this.page <= 1) {
                this.page = 1;
            } else {
                this.page -= 1;
            }
        },

        nextPage() {
            console.log('[APP] [nextPage()]');
            if (this.page === undefined) {
                this.page = 1;
            } else if (this.page >= this.numPages) {
                this.page = this.numPages;
            } else {
                this.page += 1;
            }
        },

        zoomOut() {
            console.log('[APP] [zoomOut()] scale: ', this.theScale);
            if (this.theScale > 0.2) {
                this.scale -= 0.2;
            }
        },

        zoomIn() {
            console.log('[APP] [zoomIn()]');
            if (this.theScale < 3) {
                this.scale += 0.2;
            }
        },
    },
};
</script>

<template>
    <header class="">
        <h1>PDF Vuewer</h1>

        <div class="flex flex-grow-1">
            <label class="flex cursor_pointer">
                <font-awesome-icon
                    icon="fa-solid fa-file-arrow-up"
                    class="fa-xl"
                />
                <h2>Upload File</h2>
                <input
                    type="file"
                    accept="application/pdf"
                    hidden
                />
            </label>

            <nav class="flex flex-grow-1">
                <button @click="previousPage()">
                    <font-awesome-icon
                        icon="fa-solid fa-chevron-left"
                        class="fa-xl"
                    />
                </button>
                <input
                    type="number"
                    v-model="page"
                    @keyup="checkPage()"
                    min="1"
                    :max="numPages"
                    :placeholder="page === undefined ? 'ALL' : ''"
                />
                <button @click="nextPage()">
                    <font-awesome-icon
                        icon="fa-solid fa-chevron-right"
                        class="fa-xl"
                    />
                </button>
            </nav>

            <div class="flex">
                <button @click="zoomOut()">
                    <font-awesome-icon
                        icon="fa-solid fa-magnifying-glass-minus"
                        class="fa-xl"
                    />
                </button>
                <button @click="zoomIn()">
                    <font-awesome-icon
                        icon="fa-solid fa-magnifying-glass-plus"
                        class="fa-xl"
                    />
                </button>
            </div>
        </div>
    </header>
    <hr />
    <main class="flex flex-col overflow--auto">
        <PDFDocument
            :url="url"
            :scale="theScale"
            :currentPage="page"
            @num-pages="(pages) => (this.numPages = pages)"
        />
    </main>
</template>

<style>
header {
    padding: 1rem 0;
}

main {
    padding: 1rem 0;
}

main > * {
    padding-bottom: 1rem;
}

input {
    font-size: 1.2rem;
    text-align: center;
    padding: 0.5rem;
    border-radius: 1rem;
    border: 0.5px solid var(--color-text);
    background-color: transparent;
    color: var(--color-text);
}

input::placeholder {
    color: var(--color-text);
}

label {
    padding: 0.5rem;
}

button {
    border: none;
    background-color: transparent;
    color: unset;
    cursor: pointer;
    text-align: center;
}

svg {
    padding: 0.5rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type='number'] {
    -moz-appearance: textfield;
}
</style>
