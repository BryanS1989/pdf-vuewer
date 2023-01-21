<script>
import { toRaw } from 'vue';
import { h } from 'vue';

export default {
    name: 'PDFPage',

    props: {
        page: Object,
        scale: Number,
        pageNumber: Number,
    },

    data() {
        return {
            viewport: {},
            renderTask: null,
        };
    },

    watch: {},

    computed: {
        canvasAttrs() {
            console.log('[PDFPage] [computed] [canvasAttrs]');

            let { width, height } = this.viewport;

            [width, height] = [width, height].map((dim) => Math.ceil(dim));

            const style = this.canvasStyle;

            return {
                width,
                height,
                style,
                class: 'pdf-page',
            };
        },

        canvasStyle() {
            console.log('[PDFPage] [computed] [canvasStyle]');

            const { width: actualSizeWidth, height: actualSizeHeight } =
                this.actualSizeViewport;

            const pixelRatio = window.devicePixelRatio || 1;

            const [pixelWidth, pixelHeight] = [
                actualSizeWidth,
                actualSizeHeight,
            ].map((dim) => Math.ceil(dim / pixelRatio));

            return `width: ${pixelWidth}px; height: ${pixelHeight}px`;
        },

        actualSizeViewport() {
            console.log('[PDFPage] [computed] [actualSizeViewport]');

            return this.viewport.clone({ scale: this.scale });
        },
    },

    methods: {
        drawPage() {
            console.log('[PDFPage] [drawPage()]');

            if (this.renderTask) return;

            const { viewport } = this;

            const canvasContext = this.$el.getContext('2d');

            const renderContext = { canvasContext, viewport };

            // INFO: Use toRaw because page is a Proxy, with toRaw we get:
            // renderTask   --> RenderTask
            this.renderTask = toRaw(this.page).render(renderContext);

            toRaw(toRaw(this.renderTask).promise)
                .then(() => {
                    this.$emit('rendered', this.page);
                })
                .catch((err) => {
                    console.log('RenderTask Error: ', err);
                    this.destroyRenderTask();
                });
        },

        destroyPage(page) {
            if (!page) return;

            page._destroy();

            if (this.renderTask) this.renderTask.cancel();
        },

        destroyRenderTask() {
            if (!this.renderTask) return;

            this.renderTask.cancel();

            delete this.renderTask;
        },
    },

    created() {
        console.log('[PDFPage] [created()]');
        // viewport --> PageViewport
        this.viewport = this.page.getViewport({ scale: this.scale });
    },

    mounted() {
        console.log('[PDFPage] [mounted()]');

        this.drawPage();
    },

    beforeUnmount() {
        console.log('[PDFPage] [beforeUnmount()]');

        //this.destroyPage(this.page);
    },

    render() {
        const { canvasAttrs: attrs } = this;
        return h('canvas', attrs);
    },
};
</script>

<style>
.pdf-page {
    display: block;
    margin: 0 auto 0.5em;
}
</style>
