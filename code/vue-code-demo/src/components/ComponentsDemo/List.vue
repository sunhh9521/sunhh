<template>
    <div>
        <ul>
            <li v-for="item in list" :key="item.id">
                {{item.title}}

                <button @click="deleteItem(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>

<script>
import event from './event'

export default {
    // props: ['list']
    props: {
        // prop 类型和默认值
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {

        }
    },
    methods: {
        deleteItem(id) {
            this.$emit('delete', id)
        },
        addTitleHandler(title) {
            // eslint-disable-next-line
            console.log('on add title', title)
        }
    },
    beforeCreate() {
        // eslint-disable-next-line
        console.log('list beforeCreate')
    },
    created() {
        // eslint-disable-next-line
        console.log('list created')
    },
    beforeMount() {
        // eslint-disable-next-line
        console.log('list beforeMount')
    },
    mounted() {
        // eslint-disable-next-line
        console.log('list mounted')
        // 绑定自定义事件
        event.$on('onAddTitle', this.addTitleHandler)
    },
    beforeUpdate() {
        // eslint-disable-next-line
        console.log('list beforeUpdate')
    },
    updated() {
        // eslint-disable-next-line
        console.log('list updated')
    },
    beforeDestroy() {
        // eslint-disable-next-line
        console.log('list beforeDestroy')
        // 及时销毁，否则可能造成内存泄露
        event.$off('onAddTitle', this.addTitleHandler)
    },
    destroyed() {
        // eslint-disable-next-line
        console.log('list destroyed')
    }
}
</script>