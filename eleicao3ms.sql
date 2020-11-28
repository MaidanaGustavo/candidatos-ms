--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0 (Debian 13.0-1.pgdg100+1)
-- Dumped by pg_dump version 13.0 (Debian 13.0-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: arquivos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.arquivos (
    "idArquivo" bigint NOT NULL,
    nome text,
    url text,
    tipo text,
    "codTipo" bigint,
    "fullFilePath" text,
    "fileInputStream" text,
    "fileByteArray" text,
    "idCandidato" bigint
);


--
-- Name: bens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bens (
    "idBens" bigint NOT NULL,
    ordem bigint,
    descricao text,
    "descricaoDeTipoDeBem" text,
    valor double precision,
    "dataUltimaAtualizacao" date,
    "idCandidato" bigint
);


--
-- Name: candidatos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.candidatos (
    id bigint NOT NULL,
    "nomeUrna" text,
    numero bigint,
    "idCandidatoSuperior" bigint,
    "nomeCompleto" text,
    "descricaoSexo" text,
    "dataDeNascimento" date,
    "tituloEleitor" bigint,
    "descricaoEstadoCivil" text,
    "descricaoCorRaca" text,
    "descricaoSituacao" text,
    nacionalidade text,
    "grauInstrucao" text,
    ocupacao text,
    "gastoCampanha1T" double precision,
    "gastoCampanha2T" double precision,
    "sgUfNascimento" text,
    "nomeMunicipioNascimento" text,
    "localCandidatura" text,
    "ufCandidatura" text,
    "ufSuperiorCandidatura" text,
    "dataUltimaAtualizacao" date,
    "fotoUrl" text[],
    "fotoDataUltimaAtualizacao" text,
    "descricaoTotalizacao" text,
    "nomeColigacao" text[],
    "composicaoColigacao" text[],
    "numeroProcessoDrap" text,
    "numeroProcessoDrapEncrypt" text[],
    "numeroProcesso" text[],
    "numeroProcessoEncrypt" text[],
    "numeroProcessoPrestContas" text,
    "numeroProcessoPrestContasEncrypt" text,
    "numeroProtocolo" text,
    cargo json,
    "totalDeBens" double precision,
    vices json,
    partido json,
    substituto text,
    motivos text,
    "codigoSituacaoCandidato" bigint,
    "descricaoSituacaoCandidato" text,
    "st_SUBSTITUIDO" boolean,
    "descricaoNaturalidade" text,
    "st_MOTIVO_AUSENCIA_REQUISITO" boolean,
    "st_MOTIVO_CONDUTA_VEDADA" boolean,
    cnpjcampanha text,
    "gastoCampanha" double precision,
    "st_MOTIVO_ABUSO_PODER" boolean,
    "st_MOTIVO_COMPRA_VOTO" boolean,
    "ds_MOTIVO_OUTROS" text,
    "st_MOTIVO_GASTO_ILICITO" boolean,
    "st_MOTIVO_IND_PARTIDO" boolean,
    "st_MOTIVO_FICHA_LIMPA" boolean,
    "st_DIVULGA_ARQUIVOS" boolean,
    "st_DIVULGA_BENS" boolean,
    "st_DIVULGA" boolean,
    "st_REELEICAO" boolean,
    cpf character(11),
    "eleicoesAnteriores" bigint[],
    emails text[],
    sites text[],
    eleicao json
);


--
-- Name: eleicoes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.eleicoes (
    nroano text,
    local text,
    "nomeUrna" text,
    "nomeCandidato" text NOT NULL,
    ideleicao bigint NOT NULL,
    cargo text NOT NULL,
    partido text NOT NULL,
    "situacaoTotalizacao" text NOT NULL,
    "txLink" text NOT NULL
);


--
-- Data for Name: arquivos; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: bens; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: candidatos; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: eleicoes; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: arquivos pk_idArquivo; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.arquivos
    ADD CONSTRAINT "pk_idArquivo" PRIMARY KEY ("idArquivo");


--
-- Name: bens pk_idBens; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bens
    ADD CONSTRAINT "pk_idBens" PRIMARY KEY ("idBens");


--
-- PostgreSQL database dump complete
--

