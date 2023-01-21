<script setup>
import PDFDocument from './components/PDFDocument.vue';
</script>

<script>
export default {
    data() {
        return {
            url: 'https://cdn.filestackcontent.com/5qOCEpKzQldoRsVatUPS',
            scale: 2,
        };
    },
};
</script>

<template>
    <header>
        <h1>PDF Vuewer</h1>
    </header>
    <main>
        <PDFDocument
            :url="url"
            :scale="scale"
        />
    </main>
</template>

<style scoped></style>
