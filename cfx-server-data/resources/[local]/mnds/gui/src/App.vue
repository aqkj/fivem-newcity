<template>
    <div id="app">
        {{ eventData }}
        <ServerTitle />
        <Status />
        <Info />
        <Dialog />
    </div>
</template>

<script>
import Status from './components/Status/index'
import ServerTitle from './components/ServerTitle/index'
import Info from './components/Info'
import Dialog from './components/Dialog'
export default {
    name: 'App',
    components: {
        Status: Status,
        ServerTitle: ServerTitle,
        Info,
        Dialog
    },
    data() {
        return {
            eventData: {}
        }
    },
    created() {
        this.$root.$on('message', (event) => {
            if (event.data.type) {
                // console.log(event.data)
                this.eventData = event.data
            }
        })
        $(document).keyup((e) => {
            // 按下esc键
            if (e.keyCode == 27) {
                this.$root.$emit('escActive')
                $.post('http://mnds/close', JSON.stringify({}));
            }
        });
    }
}
</script>

<style lang="less">
body, html, #app{
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    user-select: none;
}
</style>