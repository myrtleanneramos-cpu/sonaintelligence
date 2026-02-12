# SONA Intelligence - Purple Theme Update

## Color Replacements Required

Replace all instances of green (#22C55E) with purple (#A855F7) throughout the app.

### Find & Replace Mapping:

1. **Primary Purple (#A855F7)** replaces **Green (#22C55E)**
   - `#22C55E` → `#A855F7`
   - `rgba(34, 197, 94,` → `rgba(168, 85, 247,`
   - `border-[#22C55E]` → `border-[#A855F7]`
   - `text-[#22C55E]` → `text-[#A855F7]`
   - `bg-[#22C55E]` → `bg-[#A855F7]`

2. **Secondary Magenta (#C026D3)** for accents
   - Can be used for secondary buttons or highlights

3. **Keep Red (#EF4444)** for errors - NO CHANGE
4. **Keep Orange (#F59E0B)** for warnings - NO CHANGE

### Files to Update:

- `/src/app/components/SonaNow.tsx`
- `/src/app/components/TokenTruth.tsx`
- `/src/app/components/Receipt.tsx`
- `/src/app/components/Rules.tsx`
- `/src/app/components/FixIt.tsx`
- `/src/app/components/BottomNav.tsx`
- `/src/app/components/ApiKeyModal.tsx`
- `/src/app/components/LoadingModal.tsx`
- `/src/app/components/SuccessModal.tsx`
- `/src/app/components/ErrorModal.tsx`
- `/src/app/components/Toaster.tsx`

### Search Patterns:

```bash
# Find all green color instances
grep -rn "#22C55E" src/app/components/
grep -rn "rgba(34, 197, 94" src/app/components/
grep -rn "22C55E" src/app/components/
```

### Replacement Examples:

#### Before:
```tsx
className="border border-[#22C55E]/40"
style={{ borderColor: '#22C55E' }}
background: 'rgba(34, 197, 94, 0.2)'
boxShadow: '0 0 16px rgba(34, 197, 94, 0.3)'
text-[#22C55E]
```

####After:
```tsx
className="border border-[#A855F7]/40"
style={{ borderColor: '#A855F7' }}
background: 'rgba(168, 85, 247, 0.2)'
boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)'
text-[#A855F7]
```

### Gradients to Add (Optional):

For even more visual impact matching the purple theme:

```tsx
// Purple gradient backgrounds
background: 'linear-gradient(135deg, #A855F7 0%, #C026D3 100%)'
background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)'

// Purple glow effects
boxShadow: '0 0 40px rgba(168, 85, 247, 0.4), 0 0 100px rgba(192, 38, 211, 0.2)'
```

## Automated Replacement (Use with caution):

The helper functions and constants have already been updated. Now just need to update component files.

### Priority Order:

1. ✅ **DONE**: `/src/app/constants/app.ts`
2. ✅ **DONE**: `/src/app/utils/helpers.ts`
3. ⏳ **TODO**: All component `.tsx` files
4. ⏳ **TODO**: `/src/app/components/Toaster.tsx`

---

**Note**: Keep positive price changes as green for financial contexts (conventional UI pattern).
