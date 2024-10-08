"use client"

import { Difficult, Mode } from '@/types/interface'
import React, { useEffect, useState } from 'react'
import { RankingEntry, getRanking } from '@/features/user/api/getRanking';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icon } from '@/features/auth/components/icon';

interface UserRankingsProps {
  modes: Mode[];
  difficulties: Difficult[];
}

const UserRankings: React.FC<UserRankingsProps> = ({ modes, difficulties }) => {
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(null);
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMode !== null && selectedDifficulty !== null) {
      const getUsersRanking = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const rankingData = await getRanking(selectedMode, selectedDifficulty);
          setRankings(rankingData);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError("ランキングデータの取得に失敗しました。");
        }
      };

      getUsersRanking();
    }
  }, [selectedMode, selectedDifficulty]);

  return (
    <div className="text-white max-w-sm mx-auto">
      <h2 className="text-white text-center mt-8 text-3xl font-medium">ランキング</h2>
      <div className="mt-8 text-lg flex justify-between">
        <div>
          <label>モード</label>
          <Select onValueChange={(value) => setSelectedMode(Number(value))}>
          <SelectTrigger className="text-lg text-black w-40" data-testid="mode-select">
              <SelectValue placeholder="モード選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {modes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id.toString()}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label>難易度</label>
          <Select onValueChange={(value) => setSelectedDifficulty(Number(value))}>
          <SelectTrigger className="text-lg text-black w-40" data-testid="difficulty-select">
              <SelectValue placeholder="難易度選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.id} value={difficulty.id.toString()}>
                    {difficulty.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-8 text-2xl">
        {isLoading ? (
          <Icon.spinner className="animate-spin" />
        ) : error ? (
          <p className="text-white">{error}</p>
        ) : rankings.length > 0 ? (
          rankings.map((ranking, index) => (
            <div key={index} className="mb-2">
              <p>No.{index + 1} {ranking.user.name} {ranking.score}回</p>
            </div>
          ))
        ) : (
          <p>ランキングデータがありません。</p>
        )}
      </div>
    </div>
  );
};

export default UserRankings;