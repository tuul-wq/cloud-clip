<template>
    <input type="text" :value="value" @input="updateValue">
</template>

<script>
export default {
    name: 'BaseInput',
    props: {
        value: {
            type: String,
            default: ''
        },
    },
    methods: {
        updateValue(event) {
            this.$emit('input', event.target.value);
        }
    },
}
</script>
<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/variables.scss';

input {
    font-size: 13pt;
	border-radius: $radius-sm;
	border: 1px solid gray;
	padding: 0.1rem 0.5rem;
    background-color: $field;
}
</style>