<script setup>
import PDFDocument from './components/PDFDocument.vue';
</script>

<script>
export default {
    data() {
        return {
            url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS',
            scale: 1,
            page: 3,
        };
    },

    methods: {
        previousPage() {
            console.log('[APP] [previousPage()]');
            this.page -= 1;
        },

        nextPage() {
            console.log('[APP] [nextPage()]');
            this.page += 1;
        },
    },
};
</script>

<template>
    <header>
        <h1>PDF Vuewer</h1>
        <nav>
            <button @click="previousPage()">
                <font-awesome-icon
                    icon="fa-solid fa-chevron-left"
                    class="fa-xl"
                />
            </button>
            <input
                type="number"
                v-model="page"
                min="1"
            />
            <button @click="nextPage()">
                <font-awesome-icon
                    icon="fa-solid fa-chevron-right"
                    class="fa-xl"
                />
            </button>
        </nav>
    </header>
    <hr />
    <main>
        <PDFDocument
            :url="url"
            :scale="scale"
            :currentPage="page"
        />
    </main>
</template>

<style>
header {
    padding: 1rem 0;
}

nav {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-evenly;
    padding: 1rem;
}

main {
    padding: 1rem 0;
}

input {
    font-size: 1.2rem;
    text-align: center;
    border: none;
    border-radius: 1rem;
    padding: 0.5rem;
}

button {
    border: none;
    background-color: transparent;
    color: unset;
    cursor: pointer;
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
