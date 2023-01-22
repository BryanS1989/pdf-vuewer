<script setup>
import PDFDocument from './components/PDFDocument.vue';
</script>

<script>
export default {
    data() {
        return {
            url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS',
            file: undefined,
            base64: undefined,
            scale: 1,
            page: 1,
            numPages: 1,
        };
    },

    computed: {
        theScale() {
            console.log('[APP] [computed] [theScale]');
            return +this.scale.toFixed(2);
        },

        src() {
            console.log('[APP] [computed] [src]');
            if (this.file !== undefined) {
                return URL.createObjectURL(this.file);
            } else if (this.url !== undefined) {
                return this.url;
            } else if (this.base64 !== undefined) {
                return { data: atob(this.base64) };
            } else {
                return 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS';
            }
        },

        fileName() {
            console.log('[APP] [computed] [fileName]');
            if (this.file !== undefined) {
                return this.file.name;
            } else {
                return 'Choose a PDF';
            }
        },
    },

    methods: {
        setNumPages(numPages) {
            console.log('[APP] [setNumPages()] numPages:', numPages);
            this.numPages = numPages;
        },

        onFileChange(event) {
            console.log('[APP] [onFileChange()] event:', event);
            var files = event.target.files || event.dataTransfer.files;

            if (!files.length) return;

            this.file = files[0];
            this.$refs['fileInput'].value = '';

            this.url = undefined;
            this.base64 = undefined;
            this.page = 1;
        },

        onUrlChange(event) {
            console.log('[APP] [onUrlChange()] event:', event);
            this.file = undefined;
            this.base64 = undefined;
            this.page = 1;
        },

        onBase64Change(event) {
            console.log('[APP] [onUrlChange()] event:', event);
            this.file = undefined;
            this.url = undefined;
            this.page = 1;
        },

        checkPage() {
            console.log('[APP] [checkPage()]');
            if (this.page <= 1) {
                this.page = 1;
            } else if (this.page >= this.numPages) {
                this.page = this.numPages;
            }
        },

        firstPage() {
            console.log('[APP] [firstPage()]');
            this.page = 1;
        },

        previousPage() {
            console.log('[APP] [previousPage()]');
            if (this.page <= 1) {
                this.page = 1;
            } else {
                this.page -= 1;
            }
        },

        nextPage() {
            console.log('[APP] [nextPage()]');
            if (this.page >= this.numPages) {
                this.page = this.numPages;
            } else {
                this.page += 1;
            }
        },

        lastPage() {
            console.log('[APP] [lastPage()]');
            this.page = this.numPages;
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
        <h1 class="flex justify-left">
            <font-awesome-icon
                icon="fa-solid fa-file-pdf"
                class="fa-l"
            />
            PDF Vuewer
        </h1>

        <hr />

        <div class="menu flex justify-between flex-grow-1">
            <div class="inputs flex align-left">
                <label class="file-uploader flex justify-left cursor_pointer">
                    <font-awesome-icon
                        icon="fa-solid fa-file-arrow-up"
                        class="fa-xl"
                    />
                    <p>{{ fileName }}</p>
                    <input
                        type="file"
                        @change="onFileChange($event)"
                        accept="application/pdf"
                        hidden
                        ref="fileInput"
                    />
                </label>
                <label class="flex justify-left cursor_pointer">
                    <font-awesome-icon
                        icon="fa-solid fa-link"
                        class="fa-xl"
                    />
                    <input
                        type="url"
                        v-model="url"
                        placeholder="https://www..."
                        @change="onUrlChange($event)"
                    />
                </label>
                <label class="flex justify-left cursor_pointer">
                    <font-awesome-icon
                        icon="fa-solid fa-file-code"
                        class="fa-xl"
                    />
                    <input
                        type="text"
                        v-model="base64"
                        placeholder="Base64"
                        @change="onBase64Change($event)"
                    />
                </label>
            </div>

            <div class="flex">
                <nav class="flex flex-grow-1">
                    <button @click="firstPage()">
                        <font-awesome-icon
                            icon="fa-solid fa-angles-left"
                            class="fa-xl"
                        />
                    </button>
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
                    <button @click="lastPage()">
                        <font-awesome-icon
                            icon="fa-solid fa-angles-right"
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
        </div>
        <hr />
    </header>
    <main class="flex flex-col overflow--auto">
        <PDFDocument
            :src="src"
            :scale="theScale"
            :currentPage="page"
            @num-pages="setNumPages(pages)"
        />
    </main>
</template>

<style>
h1 {
    padding: 1.5rem;
    font-size: 2.5rem;
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

.inputs {
}
</style>
