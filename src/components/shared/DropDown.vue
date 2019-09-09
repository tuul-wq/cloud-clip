<template>
    <select class="dropdown-list">
        <option v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            @click="select(option.value)"
        >{{ option.text }}</option>
    </select>
</template>

<script>
export default {
    name: 'DropDown',
    props: {
        options: {
            type: Array,
            default: []
        },
    },
    methods: {
        select(value) {
            this.$emit('select', value);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

.dropdown-list {
	font-size: 13pt;
	border-radius: $radius-sm;
	border: 1px solid gray;
	-webkit-appearance: none;
	-moz-appearance: none;
	background: url('~@/assets/icons/arrow-down.png') 94% / 0.8rem no-repeat #f8fdff;
	padding: 0.1rem 2rem 0.1rem 0.1rem;
}
</style>>
