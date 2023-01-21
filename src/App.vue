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
};
</script>

<template>
    <header>
        <h1>PDF Vuewer</h1>
        <nav>
            <input
                type="number"
                v-model="page"
                min="1"
            />
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
</style>
