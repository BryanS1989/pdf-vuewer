<script>
import { toRaw } from 'vue';
import range from 'lodash/range';
import * as pdfjs from 'pdfjs-dist/build/pdf';

import PDFPage from './PDFPage.vue';

export default {
    name: 'PDFDocument',

    components: {
        PDFPage,
    },

    props: {
        src: String || Object,
        scale: Number,
        currentPage: Number,
    },

    emits: ['numPages'],

    data() {
        return {
            pdf: undefined,
            numPages: 0,
            pages: [],
        };
    },

    created() {
        console.log('[PDFDocument] [created()]');

        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        // '../../node_modules/pdfjs-dist/build/pdf.worker.js';

        this.fetchPDF();
    },

    watch: {
        pdf(pdf) {
            console.log('[PDFDocument] [watch] [pdf()] pdf: ', pdf);

            this.pages = [];

            if (this.currentPage === undefined) {
                this.loadPDFComplete();
            } else {
                this.loadPDFPage();
            }
        },
        currentPage() {
            console.log('[PDFDocument] [watch] [currentPage()]');
            if (this.currentPage !== undefined) {
                this.loadPDFPage();
            }
        },
        scale() {
            console.log('[PDFDocument] [watch] [scale()]');
            if (this.currentPage === undefined) {
                this.loadPDFComplete();
            } else {
                this.loadPDFPage();
            }
        },
        src() {
            console.log('[PDFDocument] [watch] [src()]');

            this.fetchPDF();
        },
    },

    methods: {
        fetchPDF() {
            console.log('[PDFDocument] [fetchPDF()]');

            var loadingTask = pdfjs.getDocument(this.src);

            loadingTask.promise
                .then((pdf) => {
                    this.pdf = pdf;
                    this.numPages = pdf.numPages;
                    this.$emit('numPages', this.numPages);
                })
                .catch((err) => console.log(err));
        },
        loadPDFComplete() {
            console.log('[PDFDocument] [loadPDFComplete()]');

            const promises = range(1, this.numPages + 1).map((number) => {
                // INFO: Use toRaw because pdf is a Proxy, with toRaw we get:
                // pdf  --> PDFDocumentProxy
                return toRaw(this.pdf).getPage(number);
            });

            Promise.all(promises)
                .then((pages) => {
                    // pages    --> PDFPageProxy[]
                    this.pages = pages;
                })
                .catch((err) => console.log(err));
        },
        loadPDFPage() {
            console.log('[PDFDocument] [loadPDFPage()]');

            let pageAux = this.currentPage;

            if (this.currentPage < 1) pageAux = 1;
            if (this.currentPage > this.numPages) pageAux = this.numPages;

            // INFO: Use toRaw because pdf is a Proxy, with toRaw we get:
            // pdf  --> PDFDocumentProxy
            const pdfPagePromise = toRaw(this.pdf).getPage(pageAux);

            pdfPagePromise
                .then((pages) => {
                    // pages    --> PDFPageProxy[]
                    this.pages = [pages];
                })
                .catch((err) => console.log(err));
        },
    },
};
</script>

<template>
    <PDFPage
        v-for="page in pages"
        :key="`${page.pageNumber}-${scale}`"
        :page="page"
        :scale="scale"
        :pageNumber="page.pageNumber"
    />
</template>
