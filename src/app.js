App = {
    contracts: {},
    loading: false,
    account: '',
    lifeCoinContract: null,

    load: async () => {
        await App.loadWeb3();
        await App.loadAccounts();
        await App.loadContract();
        await App.render();
    },
   
    loadWeb3: async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await ethereum.enable();
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    },

    loadAccounts: async () => {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        App.account = accounts[0];
    },

    loadContract: async () => {
        const lifeCoin = await $.getJSON('LifeCoin.json');
        App.contracts.LifeCoin = TruffleContract(lifeCoin);
        App.contracts.LifeCoin.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        App.lifeCoinContract = await App.contracts.LifeCoin.deployed();
    },

    render: async () => {
        if (App.loading) {
            return;
        }

        App.setLoading(true);
        $('#account').html(App.account);

        const balance = await App.lifeCoinContract.balanceOf(App.account);
        $('#balance').html(balance.toString());

        App.setLoading(false);
    },

    setLoading: (boolean) => {
        App.loading = boolean;
        const loader = $('#loader');
        const content = $('#content');
        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    },

    mintLifeCoin: async () => {
        const amount = $('#amount').val();
        await App.lifeCoinContract.mint(App.account, amount, { from: App.account });
        window.location.reload();
    },

    transferLifeCoin: async () => {
        const recipient = $('#recipient').val();
        const amount = $('#amount').val();
        await App.lifeCoinContract.transfer(recipient, amount, { from: App.account });
        window.location.reload();
    }
}

$(() => {
    $(window).load(() => {
        App.load();
        $('#mintButton').click(App.mintLifeCoin);
        $('#transferButton').click(App.transferLifeCoin);
    })
})
