<script>
import { toRaw } from 'vue';
import range from 'lodash/range';
import * as pdfjs from 'pdfjs-dist/build/pdf';

import PDFPage from './PDFpage.vue';

export default {
    name: 'PDFDocument',

    components: {
        PDFPage,
    },

    props: {
        url: String,
        scale: Number,
        currentPage: Number,
    },

    data() {
        return {
            pdf: undefined,
            numPages: 0,
            pages: [],
        };
    },

    created() {
        console.log('[PDFDocument] [created()]');

        pdfjs.GlobalWorkerOptions.workerSrc =
            '../../node_modules/pdfjs-dist/build/pdf.worker.min.js';

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
        url() {
            console.log('[PDFDocument] [watch] [url()]');
            this.fetchPDF();
        },
    },

    methods: {
        fetchPDF() {
            console.log('[PDFDocument] [fetchPDF()]');

            var loadingTask = pdfjs.getDocument(this.url);

            loadingTask.promise
                .then((pdf) => {
                    this.pdf = pdf;
                    this.numPages = pdf.numPages;
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

            if (this.currentPage < 0) pageAux = 1;
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
        :key="page.pageNumber"
        :page="page"
        :scale="scale"
        :pageNumber="page.pageNumber"
    />
</template>
