<script>
    import CardInfo from "../components/CardInfo.svelte";
    
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
</script>

<main>
    <br/>
    <div class="deze">
        <CardInfo id={id} width=1000 height=600/>
    </div>
</main>

<style>
    .deze {
        display: flex;
        justify-content: center;
    }
</style>