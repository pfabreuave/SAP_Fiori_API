sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
                let dadosGerais = {};
                let classificacao = {};
                let partidas = {};

                let dadosModel = new JSONModel(dadosGerais);
                let classificacaoModel = new JSONModel(classificacao);
                let partidasModel = new JSONModel(partidas);

                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                this.buscarClassificacao();                
            },
            buscarDadosGerais: function () {
                let dadosModel = this.getView().getModel("ModeloDadosGerais");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_0cb46ce44c987c8bf328511a351414"
                    }
                };

                $.ajax(configuracoes)
                    .done(function (resposta) {
                        dadosModel.setData(resposta)
                        this.buscarPartidas(resposta.rodada_atual.rodada);
                    }
                    .bind(this))
                    .fail(function (error) {
                        console.log(error)
                    });
            },
            buscarClassificacao: function () {
                let classificacaoModel = this.getView().getModel("ModeloClassificacao");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_0cb46ce44c987c8bf328511a351414"
                    }
                };

                $.ajax(configuracoes)
                    .done(function (resposta) {
                        classificacaoModel.setData({
                            "Classificacao":resposta
                        })
                    })
                    .fail(function (error) {
                        console.er(error)
                    });
            },
            buscarPartidas: function (rodada) {
                let partidasModel = this.getView().getModel("ModeloPartidas");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_0cb46ce44c987c8bf328511a351414"
                    }
                };

                $.ajax(configuracoes)
                    .done(function (resposta) {
                        partidasModel.setData(resposta)
                    })
                    .fail(function (error) {
                        console.log(error)
                    });
            }
        });
    });
