<script>
    import CardInfo from "../components/CardInfo.svelte";
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id')
</script>

<main> 
    <CardInfo id={id}/>
</main>