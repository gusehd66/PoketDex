import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled/macro";

import PoketmonInfo from "../components/PoketmonInfo";
import Tabs from "../components/Tabs";
import About from "../components/About";
import Stats from "../components/Stats";
import Evolution from "../components/Evolution";

import usePoketmonQuery from "../hooks/usePoketmonQuery";
import useSpeciesQuery from "../hooks/useSpecies";

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const TabsWrapper = styled.div`
  margin: 24px auto 0;
`;

const DetailPage = () => {
  const { id } = useParams();

  const [selectedTab, setSelectedTab] = useState("about");

  const poketmonQueryResult = usePoketmonQuery(id);
  const speciesQueryResult = useSpeciesQuery(id);

  const { name, types, height, weight, abilities, baseExp, stats } = useMemo(
    () => ({
      name: poketmonQueryResult.data?.data.name,
      types: poketmonQueryResult.data?.data.types,
      height: poketmonQueryResult.data?.data.height,
      weight: poketmonQueryResult.data?.data.weight,
      abilities: poketmonQueryResult.data?.data.abilities,
      baseExp: poketmonQueryResult.data?.data.base_experience,
      stats: poketmonQueryResult.data?.data.stats,
    }),
    [poketmonQueryResult]
  );

  const {
    color,
    growthRate,
    flavorText,
    genderRate,
    isLegendary,
    isMythical,
    evolutionChainUrl,
  } = useMemo(
    () => ({
      color: speciesQueryResult.data?.data.color,
      growthRate: speciesQueryResult.data?.data.growth_rate.name,
      flavorText:
        speciesQueryResult.data?.data.flavor_text_entries[0].flavor_text,
      genderRate: speciesQueryResult.data?.data.gender_rate,
      isLegendary: speciesQueryResult.data?.data.is_legendary,
      isMythical: speciesQueryResult.data?.data.is_mythical,
      evolutionChainUrl: speciesQueryResult.data?.data.evolution_chain.url,
    }),
    [speciesQueryResult]
  );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <PoketmonInfo id={id} name={name} types={types} color={color} />
      <TabsWrapper>
        <Tabs color={color} tab={selectedTab} onClick={handleTabClick} />
      </TabsWrapper>
      {selectedTab === "about" && (
        <About
          isLoading={
            poketmonQueryResult.isLoading || speciesQueryResult.isLoading
          }
          color={color}
          growthRate={growthRate}
          flavorText={flavorText}
          genderRate={genderRate}
          isLegendary={isLegendary}
          isMythical={isMythical}
          types={types}
          weight={weight}
          height={height}
          baseExp={baseExp}
          abilities={abilities}
        />
      )}
      {selectedTab === "stats" && (
        <Stats
          isLoading={
            poketmonQueryResult.isLoading || speciesQueryResult.isLoading
          }
          color={color}
          stats={stats}
        />
      )}
      {selectedTab === "evolution" && (
        <Evolution
          id={id}
          isLoading={speciesQueryResult.isLoading}
          color={color}
          url={evolutionChainUrl}
        />
      )}
    </Container>
  );
};

export default DetailPage;
