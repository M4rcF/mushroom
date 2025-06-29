# 📋 Guia do Formato CSV para Predição em Lote

## 🎯 Formato Esperado

O sistema espera dados CSV com **21 colunas** na seguinte ordem:

### 📊 Estrutura do CSV

```csv
cap-shape,cap-surface,cap-color,bruises,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-color,ring-number,ring-type,spore-print-color,population,habitat
x,s,y,t,p,f,c,n,k,e,e,s,s,w,w,w,o,p,k,s,u
f,s,y,t,a,f,c,b,k,e,c,s,s,w,w,w,o,p,n,n,g
```

### 🔤 Códigos de Valores

#### **cap-shape** (Forma do Chapéu)
- `b` = Bell (Sino)
- `c` = Conical (Cônico)
- `x` = Convex (Convexo)
- `f` = Flat (Plano)
- `k` = Knobbed (Com protuberância)
- `s` = Sunken (Afundado)

#### **cap-surface** (Superfície do Chapéu)
- `f` = Fibrous (Fibroso)
- `g` = Grooves (Com sulcos)
- `y` = Scaly (Escamoso)
- `s` = Smooth (Liso)

#### **cap-color** (Cor do Chapéu)
- `n` = Brown (Marrom)
- `b` = Buff (Bege)
- `c` = Cinnamon (Canela)
- `g` = Gray (Cinza)
- `r` = Green (Verde)
- `p` = Pink (Rosa)
- `u` = Purple (Roxo)
- `e` = Red (Vermelho)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **bruises** (Machucados)
- `t` = Bruises (Sim)
- `f` = No Bruises (Não)

#### **odor** (Odor)
- `a` = Almond (Amêndoa)
- `l` = Anise (Anis)
- `c` = Creosote (Creosoto)
- `y` = Fishy (Peixe)
- `f` = Foul (Fétido)
- `m` = Musty (Mofado)
- `n` = None (Nenhum)
- `p` = Pungent (Pungente)
- `s` = Spicy (Picante)

#### **gill-attachment** (Anexo das Lâminas)
- `a` = Attached (Anexado)
- `d` = Descending (Descendente)
- `f` = Free (Livre)
- `n` = Notched (Entalhado)

#### **gill-spacing** (Espaçamento das Lâminas)
- `c` = Close (Fechado)
- `w` = Crowded (Aglomerado)
- `d` = Distant (Distante)

#### **gill-size** (Tamanho das Lâminas)
- `b` = Broad (Largo)
- `n` = Narrow (Estreito)

#### **gill-color** (Cor das Lâminas)
- `k` = Black (Preto)
- `n` = Brown (Marrom)
- `b` = Buff (Bege)
- `h` = Chocolate (Chocolate)
- `g` = Gray (Cinza)
- `r` = Green (Verde)
- `o` = Orange (Laranja)
- `p` = Pink (Rosa)
- `u` = Purple (Roxo)
- `e` = Red (Vermelho)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **stalk-shape** (Forma do Caule)
- `e` = Enlarging (Alargando)
- `t` = Tapering (Afunilando)

#### **stalk-root** (Raiz do Caule)
- `b` = Bulbous (Bulboso)
- `c` = Club (Clavado)
- `u` = Cup (Copo)
- `e` = Equal (Igual)
- `z` = Rhizomorphs (Rizomorfos)
- `r` = Rooted (Enraizado)
- `?` = Missing (Ausente)

#### **stalk-surface-above-ring** (Superfície do Caule - Acima do Anel)
- `f` = Fibrous (Fibroso)
- `y` = Scaly (Escamoso)
- `k` = Silky (Sedoso)
- `s` = Smooth (Liso)

#### **stalk-surface-below-ring** (Superfície do Caule - Abaixo do Anel)
- `f` = Fibrous (Fibroso)
- `y` = Scaly (Escamoso)
- `k` = Silky (Sedoso)
- `s` = Smooth (Liso)

#### **stalk-color-above-ring** (Cor do Caule - Acima do Anel)
- `n` = Brown (Marrom)
- `b` = Buff (Bege)
- `c` = Cinnamon (Canela)
- `g` = Gray (Cinza)
- `o` = Orange (Laranja)
- `p` = Pink (Rosa)
- `e` = Red (Vermelho)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **stalk-color-below-ring** (Cor do Caule - Abaixo do Anel)
- `n` = Brown (Marrom)
- `b` = Buff (Bege)
- `c` = Cinnamon (Canela)
- `g` = Gray (Cinza)
- `o` = Orange (Laranja)
- `p` = Pink (Rosa)
- `e` = Red (Vermelho)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **veil-color** (Cor do Véu)
- `n` = Brown (Marrom)
- `o` = Orange (Laranja)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **ring-number** (Número de Anéis)
- `n` = None (Nenhum)
- `o` = One (Um)
- `t` = Two (Dois)

#### **ring-type** (Tipo de Anel)
- `c` = Cobwebby (Teia de aranha)
- `e` = Evanescent (Evanescente)
- `f` = Flaring (Alargado)
- `l` = Large (Grande)
- `n` = None (Nenhum)
- `p` = Pendant (Pendente)
- `s` = Sheathing (Bainha)
- `z` = Zone (Zona)

#### **spore-print-color** (Cor da Impressão de Esporos)
- `k` = Black (Preto)
- `n` = Brown (Marrom)
- `b` = Buff (Bege)
- `h` = Chocolate (Chocolate)
- `r` = Green (Verde)
- `o` = Orange (Laranja)
- `u` = Purple (Roxo)
- `w` = White (Branco)
- `y` = Yellow (Amarelo)

#### **population** (População)
- `a` = Abundant (Abundante)
- `c` = Clustered (Agrupado)
- `n` = Numerous (Numeroso)
- `s` = Scattered (Espalhado)
- `v` = Several (Vários)
- `y` = Solitary (Solitário)

#### **habitat** (Habitat)
- `g` = Grasses (Gramíneas)
- `l` = Leaves (Folhas)
- `m` = Meadows (Prados)
- `p` = Paths (Caminhos)
- `u` = Urban (Urbano)
- `w` = Waste (Lixo)
- `d` = Woods (Bosques)

## 📝 Exemplo Completo

```csv
cap-shape,cap-surface,cap-color,bruises,odor,gill-attachment,gill-spacing,gill-size,gill-color,stalk-shape,stalk-root,stalk-surface-above-ring,stalk-surface-below-ring,stalk-color-above-ring,stalk-color-below-ring,veil-color,ring-number,ring-type,spore-print-color,population,habitat
x,s,y,t,p,f,c,n,k,e,e,s,s,w,w,w,o,p,k,s,u
f,s,y,t,a,f,c,b,k,e,c,s,s,w,w,w,o,p,n,n,g
x,y,y,t,l,f,c,b,h,e,r,s,s,w,w,p,o,p,k,s,m
b,s,w,t,p,f,c,n,n,e,e,s,s,w,w,e,o,p,w,d,w
```

## ⚠️ Regras Importantes

1. **Primeira linha**: Sempre deve conter os cabeçalhos exatos
2. **Separador**: Use vírgula (,) para separar colunas
3. **Valores**: Use apenas os códigos de uma letra
4. **Sem espaços**: Não inclua espaços extras
5. **Sem aspas**: Não use aspas nos valores
6. **Valores obrigatórios**: Todos os 21 campos são obrigatórios

## 🚀 Como Usar

1. Copie o exemplo acima
2. Cole na caixa de texto da aba "Predição em Lote"
3. Clique em "Classificar em Lote"
4. Veja os resultados na tabela 